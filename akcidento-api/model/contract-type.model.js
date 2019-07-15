module.exports = (sequelize, Sequelize) => {
    const ContractType = sequelize.define('contractType', {
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return ContractType;
}