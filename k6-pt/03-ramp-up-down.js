import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, //durante 30 segundos teremos 20 usuários
    { duration: '1m30s', target: 10 }, //nos próximos 1m30s tem que ir de 20 pra 10 usuários 
    { duration: '20s', target: 0 }, //nos últimos 20 segundos, todos os usuários saem
  ],
};

export default function () {
  const res = http.get('https://google.com');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
