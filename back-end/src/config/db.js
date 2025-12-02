
import { Sequelize } from 'sequelize';

export const sequelize
    = new Sequelize('postgres://postgres:' +
    'postgres@localhost:5432/postgres',
    {
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
});

// Create the Product model
// export const User = userModel;

// If you need associations, handle them directly
// Product.associate && Product.associate({ Product });