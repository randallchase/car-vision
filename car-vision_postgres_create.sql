CREATE TABLE "cars" (
	"id" serial NOT NULL UNIQUE,
	"make" TEXT NOT NULL,
	"model" TEXT NOT NULL,
	"year" integer NOT NULL,
	CONSTRAINT cars_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
--
CREATE TABLE "ads" (
	"id" SERIAL NOT NULL,
	"tier" TEXT NOT NULL,
	"demographic_1" BIGINT NOT NULL,
	"demographic_2" BIGINT NOT NULL,
	"demographic_3" BIGINT NOT NULL,
	CONSTRAINT ads_pk PRIMARY KEY ("id"),
	FOREIGN KEY ("demographic_1") REFERENCES "demographics"("id"),
	FOREIGN KEY ("demographic_2") REFERENCES "demographics"("id"),
	FOREIGN KEY ("demographic_3") REFERENCES "demographics"("id")
) WITH (
  OIDS=FALSE
);
--
CREATE TABLE "cars_pass" (
	"id" serial NOT NULL,
	"car" serial NOT NULL,
	"quantity" bigint NOT NULL,
	"dtg" time with time zone NOT NULL,
	CONSTRAINT cars_pass_pk PRIMARY KEY ("id"),
  FOREIGN KEY ("car") REFERENCES "cars"("id")
) WITH (
  OIDS=FALSE
);
--
CREATE TABLE "ad_shown" (
	"id" serial NOT NULL,
	"ad" bigint NOT NULL,
	"dtg" time with time zone NOT NULL,
	CONSTRAINT ad_shown_pk PRIMARY KEY ("id"),
  FOREIGN KEY ("ad") REFERENCES "ads"("id")
) WITH (
  OIDS=FALSE
);
--
CREATE TABLE "demographics" (
	"id" serial NOT NULL,
	"gender" TEXT NOT NULL,
	"age_category" smallint NOT NULL,
	"income_range" smallint NOT NULL,
	CONSTRAINT demographics_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
--
CREATE TABLE "car_fits_demographic" (
	"car" bigint NOT NULL,
	"demographic" bigint NOT NULL,
	"strength" bigint NOT NULL,
	CONSTRAINT car_fits_demographic_pk PRIMARY KEY ("car","demographic"),
  FOREIGN KEY ("car") REFERENCES "cars"("id"),
  FOREIGN KEY ("demographic") REFERENCES "demographics"("id")
) WITH (
  OIDS=FALSE
);
--
CREATE TABLE "contracts" (
	"id" serial NOT NULL,
	"company" TEXT NOT NULL,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	CONSTRAINT contracts_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
--
CREATE TABLE "ads_in_contract" (
	"ad" bigint NOT NULL,
	"contract" bigint NOT NULL,
	CONSTRAINT ads_in_contract_pk PRIMARY KEY ("ad","contract"),
  FOREIGN KEY ("ad") REFERENCES "ads"("id"),
  FOREIGN KEY ("contract") REFERENCES "contracts"("id")
) WITH (
  OIDS=FALSE
);
--
