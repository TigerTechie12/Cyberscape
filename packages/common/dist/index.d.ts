import * as z from 'zod';
export declare const InputModel: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    type: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const userMetaData: z.ZodObject<{
    avatarId: z.ZodString;
}, z.core.$strip>;
export declare const spaceData: z.ZodObject<{
    name: z.ZodString;
    dimensions: z.ZodString;
    mapId: z.ZodString;
}, z.core.$strip>;
export declare const spaceElements: z.ZodObject<{
    elementId: z.ZodString;
    spaceId: z.ZodString;
    x: z.ZodNumber;
    y: z.ZodNumber;
}, z.core.$strip>;
export declare const mapCreator: z.ZodObject<{
    imageUrl: z.ZodString;
    width: z.ZodNumber;
    height: z.ZodNumber;
    static: z.ZodBoolean;
}, z.core.$strip>;
//# sourceMappingURL=index.d.ts.map