import { initEdgeStore } from "@edgestore/server";
import {
    CreateContextOptions,
    createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";
import { z } from "zod";

type Context = {
    userId?: string;
    userRole?: string;
};

function createContext({ req }: CreateContextOptions): Context {

    return {};
}

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
    myPublicImages: es.imageBucket({
        maxSize: 1024 * 1024 * 2,
    })

    .input(
        z.object({
            type: z.enum(["post", "post"]),
        })
    )
    .path(({input}) => [{type: input.type}]),
    
    myMultiFiles: es.fileBucket({
        maxSize: 1024 * 1024 * 2,
    }),


    myMultiImages: es.fileBucket({
        maxSize: 1024 * 1024 * 2,
    }),
   

});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
    createContext,
});

export {handler as GET, handler as POST};
export type EdgeStoreRouter = typeof edgeStoreRouter;
