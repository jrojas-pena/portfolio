import { MikroORM } from "@mikro-orm/core";
import { __dbpassword__, __dbuser__, __prod__ } from "./constants";

const main = async () => {
    const orm = await MikroORM.init({
        dbName: 'portfolio',
        user: __dbuser__,
        password: __dbpassword__,
        type: 'postgresql',
        debug: !__prod__
    });
}

main()