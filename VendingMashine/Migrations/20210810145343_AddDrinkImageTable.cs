using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VendingMashine.Migrations
{
    public partial class AddDrinkImageTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Drinks");

            migrationBuilder.CreateTable(
                name: "DrinkImage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrinkId = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrinkImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DrinkImage_Drinks_DrinkId",
                        column: x => x.DrinkId,
                        principalTable: "Drinks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DrinkImage_DrinkId",
                table: "DrinkImage",
                column: "DrinkId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DrinkImage");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Drinks",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
