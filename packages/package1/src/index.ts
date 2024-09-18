import {MikroORM, Options} from "@mikro-orm/sqlite";


export const bootstrapDb = async ({entities, mikroORMInit}: {
    entities: Options["entities"],
    mikroORMInit?: typeof MikroORM.init
}): Promise<MikroORM> => {

    const mikroOrmConfig: Options = {
        entities: entities,

        driverOptions: undefined,
        dbName: "db.sqlite",
        debug: true,
    };

    if (mikroORMInit) {
        return await mikroORMInit(mikroOrmConfig);
    } else {
        return await MikroORM.init(mikroOrmConfig);
    }
};
