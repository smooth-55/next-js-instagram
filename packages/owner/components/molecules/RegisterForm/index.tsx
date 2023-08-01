import React, { useState } from "react";


import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import { Button, Form } from "../../atoms";
import { notification } from "antd";
import { CreateUser } from "../../../services/auth";

const RegisterForm = () => {
    const router = useRouter()
    const initialValues = {
        email: "",
        username: "",
        full_name: "",
        phone: "",
        password: "",
    }
    const [passwordIsHide, setPasswordIsHide] = useState(true);

    const formControl = () => {
        if (
            formik?.values?.email.length > 0 &&
            formik?.values?.username.length > 0 &&
            formik?.values?.password.length > 0 &&
            formik?.values?.full_name.length > 0
        ) {
            return true;
        }
        return false;
    };

    const inputActiveClass = (el) => {
        if (el.length > 0) return "active";
        return "";
    };


    const { mutate: mutateUser } = useMutation(
        CreateUser,
        {
            onSuccess: (data) => {
                notification.success({
                    message: "Registration success"
                })
                router.push("/login")
            },
            onError: (error: any) => {
                console.log(error)
                notification.error({
                    message: error?.response?.data?.error
                })
            }
        }

    )

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, actions,) => {
            mutateUser(values)
            actions.resetForm()
        },
    });


    return (
        <Form>
            <label className={`${inputActiveClass(formik?.values?.email)}`}>
                <input
                    className="input"
                    value={formik?.values?.email}
                    name={"email"}
                    onChange={formik?.handleChange}
                    type="email"
                />
                <span>Email</span>
            </label>

            <label className={`input-box ${inputActiveClass(formik?.values?.full_name)}`}>
                <input
                    className="input"
                    value={formik?.values?.full_name}
                    name={"full_name"}
                    onChange={formik?.handleChange}
                    type="text"
                />
                <span>Full Name</span>
            </label>

            <label className={`input-box ${inputActiveClass(formik?.values?.username)}`}>
                <input
                    className="input"
                    value={formik?.values?.username}
                    name={"username"}
                    onChange={formik?.handleChange}
                    type="text"
                />
                <span>Username</span>
            </label>

            <label className={`input-box ${inputActiveClass(formik?.values?.password)}`}>
                <input
                    className="input"
                    value={formik?.values?.password}
                    name={"password"}
                    onChange={formik?.handleChange}
                    type={passwordIsHide ? "password" : "text"}
                />
                <span>Password</span>
                <button
                    className="btn"
                    type="button"
                    onClick={() => setPasswordIsHide(!passwordIsHide)}
                >
                    {passwordIsHide ? "Show" : "Hide"}
                </button>
            </label>

            <Button disabled={!formControl()} type={"submit"} onClick={(e) => {
                e.preventDefault()
                formik?.handleSubmit()
            }}>Sign Up</Button>
        </Form>
    );
};

export { RegisterForm };
