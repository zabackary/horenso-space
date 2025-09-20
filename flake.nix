{
  description = "Node.js development environment for Horenso SPACE";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        nodejs = pkgs.nodejs_24; # Specify Node.js version
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            nodejs
            pkgs.pnpm
            pkgs.supabase-cli
          ];
        };
      }
    );
}
