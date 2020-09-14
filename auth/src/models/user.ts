import mongoose from 'mongoose';
import { Password } from '../services/password';
// dan interface that describe the properties that are required to create
// a new User 
interface UserAttrs {
  email: string,
  password: string
}
// an interface that describes the properties that user model has. (for the build function)
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
// an inteface that describes a document that user 
// user document has.
interface UserDoc extends mongoose.Document {
  email: string,
  password: string
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }   //doc mongoose document the being converted 
      // ret the plain object convertion 
      // options

    }
  });

userSchema.pre("save", async function (done) {
  if (this.isModified('password')) { // hash only if modified
    const hash = await Password.toHash(this.get('password'));
    this.set("password", hash);
  }
  done();
});
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const user = User.build({
  email: "sdfsd@gmail.com",
  password: "123qwe"
});



const buildUser = (attrs: UserAttrs) => {     // type checking functiom -> this way we will build user correctly.
  return new User(attrs);
}
buildUser({ email: "asda @gmail.com", password: "1234wer" });
export { User, buildUser };