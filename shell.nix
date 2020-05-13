with import <nixpkgs> {};

pkgs.mkShell {
  buildInputs = [
    nodejs
  ];
  shellHook = ''
    export PATH="$PWD/node_modules/.bin/:$PATH"
  '';
}
