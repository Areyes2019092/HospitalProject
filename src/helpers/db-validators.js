import User from "../modules/user/user.model.js";

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