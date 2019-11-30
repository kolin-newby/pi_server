CREATE TABLE IF NOT EXISTS locations(
	location_id INT NOT NULL,
	data_time timestamp,
	location_desc VARCHAR(100) DEFAULT "no description",
	location_hours VARCHAR(20) DEFAULT "not found",
	sensor_ip INT DEFAULT "not found",
	data_id INT NOT NULL,
	PRIMARY KEY(location_id)
);

CREATE TABLE IF NOT EXISTS data(
	data_id INT NOT NULL,
	highs_for_week DECIMAL(9,2)[],
	lows_for_week DECIMAL(9,2)[],
	weekly_high DECIMAL(9,2),
	weekly_low DECIMAL(9,2),
	PRIMARY KEY(data_id)
);

INSERT INTO locations
VALUES(1, '1970-01-01 00:00:01', 'UMC SECA Study Area','7am to 12am',123456789,1);
