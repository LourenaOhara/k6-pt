import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('http://google.com');
  check(res, {
    'is status 200': (r) => r.status === 200,
    'verify homepage text': (r) =>
      r.body.includes('Estou com sorte'),
  });
}
