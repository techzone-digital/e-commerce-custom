import readline from 'readline';
import mongoose from 'mongoose';
import { z } from 'zod';
import { config } from '../config/env.js';
import { User } from '../modules/users/users.model.js';
import { ROLES } from '../constants/roles.js';

// Validation schema for admin seed credentials
const adminSeedSchema = z.object({
  name: z
    .string({ required_error: 'Admin name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name cannot exceed 60 characters'),
  email: z
    .string({ required_error: 'Admin email is required' })
    .trim()
    .email('Please enter a valid email address')
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Phone number must be a valid 10-digit Indian mobile number')
    .optional()
    .or(z.literal('')),
  password: z
    .string({ required_error: 'Admin password is required' })
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

/**
 * Ask a question on the terminal interactively.
 * If hidden is true, input characters are not echoed to terminal.
 */
function promptQuestion(query: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    if (!hidden) {
      rl.question(query, (answer) => {
        rl.close();
        resolve(answer.trim());
      });
      return;
    }

    // Hidden input mode for password
    process.stdout.write(query);
    const stdin = process.stdin;
    const isRaw = stdin.isRaw;
    if (stdin.isTTY && stdin.setRawMode) {
      stdin.setRawMode(true);
    }
    stdin.resume();

    let password = '';
    const onData = (char: Buffer) => {
      const str = char.toString('utf8');
      for (const ch of str) {
        if (ch === '\n' || ch === '\r' || ch === '\u0004') {
          // Enter pressed
          if (stdin.isTTY && stdin.setRawMode) {
            stdin.setRawMode(isRaw);
          }
          stdin.removeListener('data', onData);
          process.stdout.write('\n');
          rl.close();
          resolve(password.trim());
          return;
        } else if (ch === '\u0003') {
          // Ctrl+C
          if (stdin.isTTY && stdin.setRawMode) {
            stdin.setRawMode(isRaw);
          }
          stdin.removeListener('data', onData);
          process.stdout.write('\n');
          rl.close();
          process.exit(130);
        } else if (ch === '\b' || ch === '\x7f') {
          // Backspace
          if (password.length > 0) {
            password = password.slice(0, -1);
          }
        } else {
          password += ch;
        }
      }
    };

    stdin.on('data', onData);
  });
}

/**
 * Collect admin credentials from environment variables or interactive prompt.
 */
async function getAdminCredentials() {
  let name = process.env.ADMIN_NAME;
  let email = process.env.ADMIN_EMAIL;
  let phone = process.env.ADMIN_PHONE;
  let password = process.env.ADMIN_PASSWORD;

  const isInteractive = !name || !email || !password;

  if (isInteractive) {
    console.log('\n--- Admin Account Provisioning (Interactive Mode) ---');
    if (!name) {
      name = await promptQuestion('Enter admin name: ');
    }
    if (!email) {
      email = await promptQuestion('Enter admin email: ');
    }
    if (!phone) {
      phone = await promptQuestion('Enter admin phone (optional 10-digit number): ');
    }
    if (!password) {
      password = await promptQuestion('Enter admin password (min 8 chars, 1 uppercase, 1 lowercase, 1 number): ', true);
    }
  } else {
    console.log('\n--- Admin Account Provisioning (Environment Mode) ---');
  }

  const parseResult = adminSeedSchema.safeParse({
    name,
    email,
    phone: phone || undefined,
    password,
  });

  if (!parseResult.success) {
    const errorDetails = parseResult.error.errors.map((e) => ` - ${e.path.join('.')}: ${e.message}`).join('\n');
    throw new Error(`Validation failed for admin credentials:\n${errorDetails}`);
  }

  return parseResult.data;
}

/**
 * Main seed execution routine.
 */
async function seedAdmin(): Promise<void> {
  console.log('[Seed:Admin] Starting secure admin account provisioning...');

  if (!config.database.uri) {
    throw new Error('Database connection string is missing. Please set MONGODB_URI in your environment or .env file.');
  }

  const credentials = await getAdminCredentials();
  const normalizedEmail = credentials.email.toLowerCase().trim();

  console.log('[Seed:Admin] Connecting to MongoDB...');
  await mongoose.connect(config.database.uri);
  console.log('[Seed:Admin] Connected to MongoDB successfully.');

  try {
    // Check if an account with this email already exists
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      if (existingUser.role === ROLES.SUPERADMIN) {
        console.log(`[Seed:Admin] A super administrator account with email "${normalizedEmail}" already exists.`);
        console.log('[Seed:Admin] No changes made. Seed process completed safely without duplicating accounts.');
      } else {
        console.warn(
          `[Seed:Admin] A user with email "${normalizedEmail}" already exists with role "${existingUser.role}".`
        );
        console.warn('[Seed:Admin] Aborting to prevent accidental role escalation or account overwrite.');
      }
      return;
    }

    // Check if a superadmin already exists in the system (prevent duplicate initial superadmin creation)
    const existingSuperAdmin = await User.findOne({ role: ROLES.SUPERADMIN });
    if (existingSuperAdmin) {
      console.log(`[Seed:Admin] A super administrator account already exists (${existingSuperAdmin.email}).`);
      console.log('[Seed:Admin] Initial superadmin seed allows only one superadmin. Additional admins should be created via the Super Admin API.');
      return;
    }

    // Create superadmin user using the Mongoose model
    // Relies on User model pre-save hook for password hashing (prevents double-hashing)
    const superAdminUser = await User.create({
      name: credentials.name.trim(),
      email: normalizedEmail,
      phone: credentials.phone || undefined,
      password: credentials.password,
      role: ROLES.SUPERADMIN,
      status: 'active',
      isEmailVerified: true,
    });

    console.log('[Seed:Admin] Super Administrator account successfully created!');
    console.log(` - Admin ID: ${superAdminUser._id}`);
    console.log(` - Name: ${superAdminUser.name}`);
    console.log(` - Email: ${superAdminUser.email}`);
    console.log(` - Role: ${superAdminUser.role}`);
    console.log(` - Status: ${superAdminUser.status}`);
    console.log(` - Email Verified: ${superAdminUser.isEmailVerified}`);
  } finally {
    console.log('[Seed:Admin] Disconnecting from database...');
    await mongoose.disconnect();
    console.log('[Seed:Admin] Database connection closed.');
  }
}

// Execute seed script
seedAdmin()
  .then(() => {
    console.log('[Seed:Admin] Process finished successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('[Seed:Admin] ERROR: Failed to seed admin account.');
    if (err instanceof Error) {
      console.error(`[Seed:Admin] Details: ${err.message}`);
    } else {
      console.error('[Seed:Admin] Details:', err);
    }
    // Ensure mongoose disconnects on error if connected
    if (mongoose.connection.readyState !== 0) {
      mongoose.disconnect().catch(() => {});
    }
    process.exit(1);
  });

