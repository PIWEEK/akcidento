module.exports = (sequelize, Sequelize) => {

    const Model = Sequelize.Model;

    class AccidentsBySexSect extends Model {}
    AccidentsBySexSect.init({
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            notNull: {
                msg: 'Please enter the year of this data'
            }
        },
        total: {
            type: Sequelize.REAL,
            allowNull: false,
            notNull: {
                msg: 'Please enter a total value'
            },
        }
    }, {
        sequelize,
        underscored: true,
        modelName: 'accidents_by_sexsect'
    });

    return AccidentsBySexSect;
}
