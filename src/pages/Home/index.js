import "./styles.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/Header";
import IconFilter from "../../images/icon_filter.svg";
import Lista from '../../components/Lista';
import Summary from "../../components/Summary";
import { getItem } from "../../utils/storage";

function Home() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listaTrasacao, setListaTrasacao] = useState([]);
  const [extrato, setExtrato] = useState({});
  const [isVisiblePanel, setIsvisiblePanel] = useState(false);
  const [categories, setCategories] = useState([]);

  async function getResumo() {
    try {
      const response = await api.get('/transacao/extrato', {
        headers: {
          Authorization: `Bearer ${getItem('token')}`
        }
      });
      setExtrato({ ...response.data });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function listarTransition() {
    const response = await api.get("/transacao", {
      headers: {
        Authorization: `Bearer ${getItem('token')}`
      }
    });
    setListaTrasacao(response.data);
  }

  async function handleGetCategories() {
    try {
      const response = await api.get('/categorias', {
        headers: {
          Authorization: `Bearer ${getItem('token')}`
        }
      });
      setCategories(response.data);
    } catch { }
  }

  useEffect(() => {
    listarTransition();
    getResumo();
    handleGetCategories();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="conteiner_main">
        <div className="content_table">
          <div className="conteiner_table">
            <div className="conteiner_filter">
              <button className="btn_filter" onClick={() => setIsvisiblePanel(!isVisiblePanel)}>
                <img src={IconFilter} alt="" /> Filtrar
              </button>
              {isVisiblePanel &&
                <div
                  className="filter_panel-list dflex dflex--column">
                  <span className="filters_title">Categoria</span>
                  <ul key={categories.id} className="filters_list dflex dflex--row">
                    {categories.map(categories => (
                      <li className="filters_list-item">
                        <label>{categories.descricao}
                          <input className="filter_add" name="filtro[]" defaultValue type="checkbox" />
                        </label>
                      </li>))}
                  </ul>
                  <div className="filter_buttons dflex dflex--row">
                    <button
                      className="filter_btn dflex dflex--row flex--center-center"
                      type="reset">
                      Limpar Filtros
                    </button>
                    <button className="filter_btn filter_btn-apply dflex dflex--row flex--center-center"
                      type="submit">
                      Aplicar Filtros
                    </button>
                  </div>
                </div>}
            </div>
            <div className="list_values">
              <div className="header_list">
                <ul className="headerTabela">
                  <li className="linha">Data</li>
                  <li className="linha">Dia da semana</li>
                  <li className="linha">Descrição</li>
                  <li className="linha">Categoria</li>
                  <li className="linha">Valor</li>
                </ul>
              </div>
              {
                (listaTrasacao) && listaTrasacao.map(transacao => (
                  <Lista transacao={transacao} />
                ))
              }
            </div>
          </div>
          <Summary
            extrato={extrato}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible} />

        </div>
      </div>
    </div>
  );
}

export default Home;