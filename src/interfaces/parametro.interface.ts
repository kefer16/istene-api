export interface parametroRequest {
	parametro: string;
	tipo:
		| "string"
		| "number"
		| "bigint"
		| "boolean"
		| "symbol"
		| "undefined"
		| "object"
		| "function";
}
