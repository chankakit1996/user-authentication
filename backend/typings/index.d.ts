// declare global {
//     namespace Express {
//         export interface AuthRequest extends Request {
//             token: string;
//             user: import('mongoose').Document<
//                 unknown,
//                 any,
//                 import('models').UserDocument
//             > &
//                 import('models').UserDocument & {
//                     _id: import('mongoose').Types.ObjectId;
//                 };
//         }
//     }
// }

// export interface AuthRequest extends Request {
//     token: string;
//     user: import('mongoose').Document<
//         unknown,
//         any,
//         import('models').UserDocument
//     > &
//         import('models').UserDocument & {
//             _id: import('mongoose').Types.ObjectId;
//         };
// }
