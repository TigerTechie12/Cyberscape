import * as z from 'zod';
export const InputModel = z.object({
    username: z.string(),
    password: z.string().min(8),
    type: z.string().optional()
});
export const userMetaData = z.object({ avatarId: z.string() });
//# sourceMappingURL=index.js.map