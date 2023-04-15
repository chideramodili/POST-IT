const user = require("../models/users");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
exports.find_all_user = async () => {
  return user.find().sort({ date: -1 });
};

// async function softDelete (userId){
//   const massage = "user has already been deleted"
//     const deleteUser =  await  user.findByIdAndUpdate({_id: userId})
//    return deleteUser
// }

exports.create_new_user = async user => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  return await user.save();
  // savedUser = await users.save();
  // return savedUser;
};

exports.get_a_specific_user = async userId => {
  return await user.findById({ _id: userId, isDeleted: false });
};

exports.get_all_user = async () => {
  return user.find(user.findOneAndRemove({ isDeleted: true }));

  // return await user.find().sort({ date: -1 });
};

exports.edit_user = async (userId, userName) => {
  return await user.findByIdAndUpdate(
    { _id: userId },
    {
      isDeleted: false
    },
    {
      $set: { userName: userName }
    }
  );
};

exports.delete_user = async userId => {
  return await user.findByIdAndRemove({ _id: userId });
};
exports.soft_delete_user = async userId => {
  return await user.findByIdAndUpdate(
    { _id: userId, isDeleted: false },
    { isDeleted: true }
  );

  // user.isDeleted = true;

  // return user.save();
};
