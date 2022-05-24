@echo off
@echo "Adicionando impressora: \\Impressora expedicao pedidos"
rundll32 printui.dll PrintUIEntry /in /n \\desktop-og4mv46\EXPEDI

@echo "Adicionando impressora: \\Impressora financeiro"
rundll32 printui.dll PrintUIEntry /in /n \\desktop-t5kt3b8\IMPRESSORAFINANCEIRO

@echo "Adicionando impressora: \\Impressora setor vendas"
rundll32 printui.dll PrintUIEntry /in /n \\DESKTOP-OG4MV46\HP LaserJet Professional P1102


@echo "Adicionando impressora: \\Impressora fiscal balcao"
rundll32 printui.dll PrintUIEntry /in /n \\desktop-rf8elan\FISCAL2

@echo "Adicionando impressora: \\Impressora compras"
rundll32 printui.dll PrintUIEntry /in /n \\desktop-6o9q3l6\HP LaserJet Professional P1102w A CERTA

@echo "Adicionando impressora: \\Impressora expedicao etiquetas"
rundll32 printui.dll PrintUIEntry /in /n \\desktop-bg1gmrj\HP EXPEDICAO


@echo Fim do Script.

