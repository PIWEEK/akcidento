module.exports = (sequelize, Sequelize) => {

    const Model = Sequelize.Model;

    class ContractType extends Model {}
    ContractType.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'contractType'
    });

    return ContractType;
}