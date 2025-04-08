{pkgs}: {
  deps = [
    pkgs.postgresql
    pkgs.nodejs
    pkgs.deepin.dwayland
    pkgs.rPackages.AllPossibleSpellings
    pkgs.cudaPackages.cuda_nvprof
    pkgs.libcardiacarrest
    pkgs.lua51Packages.luatext
    pkgs.lomiri.lomiri-wallpapers
    pkgs.haskellPackages.optimusprime
    pkgs.leiningen
    pkgs.ppsspp-qt
    pkgs.haskellPackages.phonetic-languages-phonetics-basics
    pkgs.python311Packages.pixel-ring
  ];
}
