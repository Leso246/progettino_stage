// Schema for register
export const registerSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        admin: { type: 'boolean' }
    },
    required: ['email', 'password', 'admin']
};

// Schema for login
export const loginSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' }
    },
    required: ['email', 'password']
};