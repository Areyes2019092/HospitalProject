import User from "../modules/user/user.model.js";
import Personal from "../modules/personal/personal.model.js";
import UrgencyLevel from "../modules/urgencyLevel/urgencyLevel.model.js";
import Illness from "../modules/illness/illness.model.js";

/*******************     User     *******************/

export const userIdNExist = async (id = '') => {
    const exist = await User.findById(id);
    if (!exist){
        throw new Error('User does not exists');
    }
};

export const userIdExist = async (id = '') => {
    const exist = await User.findById(id);
    if (exist){
        throw new Error('User exists');
    }
};

export const userDPIExist = async (DPI) => {
    const exist = await User.findOne({DPI});
    if (exist){
        throw new Error('User exists');
    }
};

export const userDPINExist = async (DPI) => {
    const exist = await User.findOne({DPI});
    if (!exist){
        throw new Error('DPI is not registered');
    }
};



/*******************    Personal      *******************/

export const PersonalRoleNExists = async (role) => {
    const exist = await Personal.findOne({role});
    if (!exist){
        throw new Error('Role doesnt exists');
    }
};

export const personalDPINExist = async (DPI) => {
    const exist = await Personal.findOne({DPI});
    if (!exist){
        throw new Error('DPI is not registered');
    }
};




/*******************    Urgency Level      *******************/

export const urgencyLExists = async (name) => {
    const exist = await UrgencyLevel.findOne({name});
    if (exist){
        throw new Error('This Urgency level already exists');
    }
};

export const urgencyLNExists = async (name) => {
    const exist = await UrgencyLevel.findOne({name});
    if (!exist){
        throw new Error('This Urgency level does not exists');
    }
};



/*******************   Illness      *******************/

export const illnessExists = async (name) => {
    const exist = await Illness.findOne({name});
    if (exist){
        throw new Error('This Illness already exists');
    }
};


