module.exports = (sequelize, Sequelize) => {

    const Model = Sequelize.Model;

    class Accident extends Model {}
    Accident.init({
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            notNull: {
                msg: 'Please enter the year of this data'
            }
        },
        total: {
            type: Sequelize.INTEGER,
            allowNull: false,
            notNull: {
                msg: 'Please enter a total value'
            },
        }
    }, {
        sequelize,
        modelName: 'accident'
    });

    return Accident;
}
