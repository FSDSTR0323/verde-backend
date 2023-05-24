const Agent = require ('../models/agent.model');

const { objectId } = require ('mongodb');
const realStateId = new Objectid ();

const addAgent = (req, res) => {
    const newAgent = new Agent({
        id_agent:req.body.id_agent,
        identification_agent: req.body.identification_agent,
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        zip_code: req.body.zip_code,
        telephone: req.body.telephone,
        email: req.body.email,
        date_register: req.body.date_register,
        observations: req.body.observations,
        id_realstate: req.body.id_realstate,
        deleteAt:req.body.deleteAt
    });

newAgent
    .save()
    .then((agent) => res.status(200).send(agent))    
    .catch((error) => {
        console.log(error.code);
        switch (error.code) {
            case 11000:
                res.status(400).send({msg: 'El agente ya existe' });
                break;
            default:
                res.status(400).send(error);
        }
    });
};



module.exports = {
    //getAgent,
    addAgent,
    //deleteAgent,
    //updateAgent,
    //permanetDeleteAgent
}