declare namespace Express {
    export interface Request {
        token?: string;
        user?:
            | (import('mongoose').Document<
                  unknown,
                  any,
                  import('../../models').UserDocument
              > &
                  import('../../models').UserDocument & {
                      _id: import('mongoose').Types.ObjectId;
                  })
            | null;
    }
}
