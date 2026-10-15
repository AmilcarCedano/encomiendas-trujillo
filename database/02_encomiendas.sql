-- HU 1.2 · Clientes, tarifario, encomiendas e historial de estados
CREATE TABLE cliente (
  id_cliente     INT AUTO_INCREMENT PRIMARY KEY,
  tipo_documento ENUM('DNI','CE','RUC') NOT NULL DEFAULT 'DNI',
  num_documento  CHAR(8)      NOT NULL UNIQUE,
  nombres        VARCHAR(100) NOT NULL,
  telefono       CHAR(9)
);

CREATE TABLE tarifa (
  id_tarifa          INT AUTO_INCREMENT PRIMARY KEY,
  id_agencia_destino INT NOT NULL UNIQUE,
  precio_base        DECIMAL(8,2) NOT NULL,
  precio_kg          DECIMAL(8,2) NOT NULL,
  FOREIGN KEY (id_agencia_destino) REFERENCES agencia(id_agencia)
);

CREATE TABLE encomienda (
  id_encomienda        INT AUTO_INCREMENT PRIMARY KEY,
  numero_guia          VARCHAR(12)  NOT NULL UNIQUE,
  id_remitente         INT NOT NULL,
  id_destinatario      INT NOT NULL,
  id_agencia_origen    INT NOT NULL,
  id_agencia_destino   INT NOT NULL,
  descripcion          VARCHAR(200) NOT NULL,
  cantidad_bultos      INT          NOT NULL CHECK (cantidad_bultos > 0),
  peso_kg              DECIMAL(7,2) NOT NULL CHECK (peso_kg > 0),
  monto                DECIMAL(8,2) NOT NULL,
  estado_pago          ENUM('PAGADO','CONTRA_ENTREGA') NOT NULL,
  estado_actual        VARCHAR(20)  NOT NULL DEFAULT 'RECIBIDO',
  hora_inicio_registro DATETIME     NOT NULL,
  fecha_registro       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario           INT NOT NULL,
  FOREIGN KEY (id_remitente)       REFERENCES cliente(id_cliente),
  FOREIGN KEY (id_destinatario)    REFERENCES cliente(id_cliente),
  FOREIGN KEY (id_agencia_origen)  REFERENCES agencia(id_agencia),
  FOREIGN KEY (id_agencia_destino) REFERENCES agencia(id_agencia),
  FOREIGN KEY (id_usuario)         REFERENCES usuario(id_usuario)
);

CREATE TABLE historial_estado (
  id_historial  INT AUTO_INCREMENT PRIMARY KEY,
  id_encomienda INT NOT NULL,
  estado        VARCHAR(20) NOT NULL,
  fecha_hora    DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario    INT NOT NULL,
  observacion   VARCHAR(200),
  FOREIGN KEY (id_encomienda) REFERENCES encomienda(id_encomienda),
  FOREIGN KEY (id_usuario)    REFERENCES usuario(id_usuario)
);

INSERT INTO tarifa (id_agencia_destino, precio_base, precio_kg) VALUES
  (1, 6.00, 1.00),
  (2, 10.00, 1.50),
  (3, 8.00, 1.20);
