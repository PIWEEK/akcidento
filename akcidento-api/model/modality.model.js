module.exports = (sequelize, Sequelize) => {
    const Model = Sequelize.Model;

    class Modality extends Model {}
    Modality.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'modality'
    });

    return Modality;
}