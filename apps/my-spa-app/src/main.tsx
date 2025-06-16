import { Button } from '@my-org/ui';
import { get } from '@my-org/http-adapter';
import { formatDate } from '@my-org/helpers';

console.log(Button());
console.log(get('/api/data'));
console.log(formatDate(new Date()));
