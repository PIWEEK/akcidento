module.exports = (sequelize, Sequelize) => {
    const ContractType = sequelize.define('contractType', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return ContractType;
}