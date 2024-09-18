import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from  '@hookform/resolvers/yup'
const SubmitForm =()=>{
    const schema = yup.object().shape({
        name : yup.string().required("فیلد نام اجباری است"),
        Email : yup.string().email("ایمیل نامعتبر است").required("ایمیل اجباری است"),
        Age : yup.number().positive().min(18).max(100).required(),
        password : yup.string().min(4).max(15).matches(/[a-z]+/)
        .matches(/[A-Z]+/).matches(/\d+/),
    //regular expression
        confirmpassword : yup.string().oneOf([yup.ref("password")],"پسورد وارد شده یکسان نیست").required()
    })
    const {register , handleSubmit , formState:{errors}}=
     useForm({resolver:yupResolver(schema)})
    const onFormSubmit=(data)=>{
        console.log("the form is submited")
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <input type="text" placeholder="Name..." {...register("name")}/>
            { errors.name &&(
                <p>{errors.name?.message}</p>
            )}
            <input type="text" placeholder="Email..."{...register("Email")}/>
            <p>{errors.Email?.message}</p>
            <input type="number" placeholder="Age..."{...register("Age")}/>
            {errors.Age?.type === 'min' && <span>سن شما از 18 سال کمتر است</span>}
      {errors.Age?.type === 'max' && <span> سن شما بیشتر از حد مجاز است</span>}
            <input type="password" placeholder="password..."{...register("password")}/>
            <p>{errors.password?.message}</p>
            <input type="password" placeholder="confirm password..."{...register("confirmpassword")}/>
            <p>{errors.confirmpassword?.message}</p>
            <input type="submit"/>
        </form>
    );
};
export default SubmitForm;