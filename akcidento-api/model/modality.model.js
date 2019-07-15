module.exports = (sequelize, Sequelize) => {
    const Modality = sequelize.define('modality', {
        modality : {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    
    return Modality;
}