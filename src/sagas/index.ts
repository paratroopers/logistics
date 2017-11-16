/**
 * define asynchronized saga jobs
 * e.g.
 * export default function * rootSaga(): any {
 *   yield[fork(watchRequestCategory),
 *       fork(watchAdminRequestCategory)]
 *}
 **/