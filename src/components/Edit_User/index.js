import "./styles.css";
import { useState } from "react";
import api from "../../services/api";
import { getItem } from '../../utils/storage';
import Close from "../../images/close.svg";


function EditUser() {

  const userData = JSON.parse(getItem('usuario'));

  const [form, setForm] = useState({
    nome: userData.nome,
    email: userData.email,
    senha: "",
    confirmacaoSenha: ""
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

      const config = {
        headers: {
          Authorization: `Bearer ${getItem('token')}`
        }
      };

      const updateData = {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      };

      const response = await api.put("/usuario", updateData, config);
      console.log(response);

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div id={'editar'} className="container-put">
      <form className="form-put_register" onSubmit={handleSubmit} >
        <img className="close-form" src={Close} width="30" alt="close" />
        <h1>Editar Perfil</h1>

        <div className="group-put_input">
          <label htmlFor="name" className="form-put_register_label">
            Nome
          </label>
          <input
            id="name"
            className="form-put_register_input"
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className="group-put_input">
          <label htmlFor="email" className="form-put_register_label">
            E-mail
          </label>
          <input
            id="email"
            className="form-put_register_input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className="group-put_input">
          <label htmlFor="password" className="form-put_register_label">
            Senha
          </label>
          <input
            id="senha"
            className="form-put_register_input"
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChangeInputValue}
          />
        </div>

        <div className="group-put_input">
          <label htmlFor="password" className="form-put_register_label">
            Confirmação de senha
          </label>
          <input
            id="confirmacaoSenha"
            className="form-put_register_input"
            type="password"
            name="confirmacaoSenha"
            value={form.confirmacaoSenha}
            onChange={handleChangeInputValue}
          />
        </div>

        <button className="form-put_register__btn" type="submit">
          Confirmar
        </button>
      </form>
      <span className="error"></span>
    </div>
  );
}

export default EditUser;
