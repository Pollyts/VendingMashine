using Microsoft.EntityFrameworkCore.Migrations;

namespace VendingMashine.Migrations
{
    public partial class AddImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DrinkImage_Drinks_DrinkId",
                table: "DrinkImage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DrinkImage",
                table: "DrinkImage");

            migrationBuilder.RenameTable(
                name: "DrinkImage",
                newName: "DrinkImages");

            migrationBuilder.RenameIndex(
                name: "IX_DrinkImage_DrinkId",
                table: "DrinkImages",
                newName: "IX_DrinkImages_DrinkId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DrinkImages",
                table: "DrinkImages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DrinkImages_Drinks_DrinkId",
                table: "DrinkImages",
                column: "DrinkId",
                principalTable: "Drinks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DrinkImages_Drinks_DrinkId",
                table: "DrinkImages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DrinkImages",
                table: "DrinkImages");

            migrationBuilder.RenameTable(
                name: "DrinkImages",
                newName: "DrinkImage");

            migrationBuilder.RenameIndex(
                name: "IX_DrinkImages_DrinkId",
                table: "DrinkImage",
                newName: "IX_DrinkImage_DrinkId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DrinkImage",
                table: "DrinkImage",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DrinkImage_Drinks_DrinkId",
                table: "DrinkImage",
                column: "DrinkId",
                principalTable: "Drinks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
