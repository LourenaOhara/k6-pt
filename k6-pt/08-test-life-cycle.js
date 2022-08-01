import http from 'k6/http';

export const options = {
    vus: 2,
    duration: '4s',
  };

export function setup() {
  const res = http.get('https://catfact.ninja/fact');
  console.log('Setup') 
}

export function teardown() {
  console.log('Teardown');
}

export default function () {
  console.log('Default');
}