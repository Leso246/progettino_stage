// Schema for register
export const requestSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        admin: { type: 'boolean' }
    },
    required: ['email', 'password', 'admin']
};