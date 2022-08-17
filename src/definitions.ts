export interface OnfidoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
