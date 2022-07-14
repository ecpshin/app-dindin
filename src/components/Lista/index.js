import { useState } from 'react';
import ModalExcluir from "../../components/Modal_Excluir";
import IconEditar from "../../images/pencil.svg";
import IconExcluir from "../../images/lixo.svg";
import ModalEdit from '../Modal_Edit';
import { diaDaSemana, formataData, formataMoeda } from "../../utils/utils";
import api from "../../services/api";
import { useNavigate } from 'react-router';
import { getItem } from '../../utils/storage';

function Lista({ transacao }) {

    const [showExcluir, setShowExcluir] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const nav = useNavigate();

    async function deleteTransaction(id) {
        try {
            await api.delete(`/transacao/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${getItem('token')}`
                    }
                });

            window.alert('Transação excluida com sucesso!');
            setShowExcluir(!showExcluir);
            nav('/', { replace: true });
        } catch {
            window.alert('Não foi possível excluir registro selecionado!');
        }
    }

    return (
        <div>

            <ul key={transacao.id} className="headerTabela">
                <li className="linha">{formataData(transacao.data)}</li>
                <li className="linha">{diaDaSemana(transacao.data)}</li>
                <li className="linha">{transacao.descricao}</li>
                <li className="linha">{transacao.categoria_nome}</li>
                <li className="linha">{formataMoeda(transacao.valor)}</li>

                <div className="group_icon">
                    <button className="btn_edite" onClick={() => setIsModalVisible(true)}>
                        <img src={IconEditar} width="24" alt="Lápis" />
                    </button>
                    {isModalVisible &&
                        <ModalEdit transacao={transacao} onClose={() => setIsModalVisible(false)} />
                    }
                    <button
                        onClick={() => setShowExcluir(!showExcluir)}
                        className="btn_delete">
                        <img src={IconExcluir} width="24" alt="Lixeira" />
                    </button>
                    {showExcluir &&
                        <ModalExcluir id={transacao.id}
                            userId={{ id: transacao.id }}
                            deleteTransaction={deleteTransaction}
                            showExcluir={showExcluir}
                            setShowExcluir={setShowExcluir} />
                    }
                </div>
            </ul>
        </div>
    )
}

export default Lista;