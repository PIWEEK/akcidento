module.exports = (sequelize, Sequelize) => {
    const Model = Sequelize.Model;

    class Province extends Model {}
    Province.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        region: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'province'
    });

    return Province;
}