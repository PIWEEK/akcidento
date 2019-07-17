module.exports = (sequelize, Sequelize) => {
    const Model = Sequelize.Model;

    class Sector extends Model {}
    Sector.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'sector'
    });

    return Sector;
}