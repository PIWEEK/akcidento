module.exports = (sequelize, Sequelize) => {
    const Modality = sequelize.define('modality', {
        name : {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    
    return Modality;
}