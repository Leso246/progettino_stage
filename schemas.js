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

// Schema for post data
export const postDataSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        key: { type: 'string' },
        data: { type: 'string' }
    },
    required: ['key', 'data']
};