import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614126587062 implements MigrationInterface {

    // up() -> Cria a migration
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cria a tabela users:
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    // down() -> Desfaz a migration
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Deleta a tabela users
        await queryRunner.dropTable("users");
    }

}
