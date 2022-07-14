import "./styles.css";
import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
function Register() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
  });

  function handleChangeInputValue(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (
        !form.nome ||
        !form.email ||
        !form.senha ||
        form.senha !== form.confirmacaoSenha
      ) {
        return;
      }

      const response = await api.post("/usuario", {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container_register">
      <img className="logo" src={Logo} width="300" alt="Dindin" />
      <form className="form_register" onSubmit={handleSubmit}>
        <h1>Cadastro</h1>

        <div className="group_input">
          <label htmlFor="name" className="form_register_label">
            Nome
          </label>
          <input
            id="name"
            className="form_register_input"
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className="group_input">
          <label htmlFor="email" className="form_register_label">
            E-mail
          </label>
          <input
            id="email"
            className="form_register_input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className="group_input">
          <label htmlFor="password" className="form_register_label">
            Senha
          </label>
          <input
            id="senha"
            className="form_register_input"
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className="group_input">
          <label htmlFor="password" className="form_register_label">
            Confirmação de senha
          </label>
          <input
            id="confirmacaoSenha"
            className="form_register_input"
            type="password"
            name="confirmacaoSenha"
            value={form.confirmacaoSenha}
            onChange={handleChangeInputValue}
          />
        </div>

        <button className="form_register__btn" type="submit">
          Cadastro
        </button>
        <Link to="/">
          <button className="form_register_link" href="/">
            Já tem cadastro? Clique aqui!
          </button>
        </Link>
      </form>
      <span className="error"></span>
    </div>
  );
}

export default Register;
