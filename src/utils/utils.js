import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formataData(date) {
    return format(+new Date(date), 'dd/MM/yy');
}

export function dataForm(date) {
    return format(+new Date(date), 'yyyy-MM-dd');
}

export function diaDaSemana(date) {
    const localDate = format(+new Date(date), 'EEE', { locale: ptBR });
    return localDate.slice(0, 1).toUpperCase() + localDate.slice(1).toLowerCase();
}

export function formataMoeda(valor) {
    if (!valor) {
        return 'R$ 0,00';
    }
    return Number(valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function ajustaValor(valor) {

    if (valor.indexOf('.') !== -1) {
        return valor.replace(',', '');
    }

    if (valor.indexOf(',') !== -1) {
        return valor.replace(',', '');
    }

    return valor * 100;
}
