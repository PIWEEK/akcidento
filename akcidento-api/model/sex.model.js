module.exports = (sequelize, Sequelize) => {
    const Model = Sequelize.Model;

    class Sex extends Model {}
    Sex.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'sex'
    });

    return Sex;
}