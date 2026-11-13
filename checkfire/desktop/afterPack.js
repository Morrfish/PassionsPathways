// Set the Windows exe icon + version strings without wine (resedit works on Linux).
const fs=require('fs'),path=require('path'),ResEdit=require('resedit');
exports.default=async ctx=>{
  if(ctx.electronPlatformName!=='win32')return;
  const exe=path.join(ctx.appOutDir,ctx.packager.appInfo.productFilename+'.exe');
  const data=fs.readFileSync(exe);const pe=ResEdit.NtExecutable.from(data);const res=ResEdit.NtExecutableResource.from(pe);
  const ico=ResEdit.Data.IconFile.from(fs.readFileSync(path.join(__dirname,'icon.ico')));
  ResEdit.Resource.IconGroupEntry.replaceIconsForResource(res.entries,1,1033,ico.icons.map(i=>i.data));
  const vi=ResEdit.Resource.VersionInfo.fromEntries(res.entries)[0];
  vi.setStringValues({lang:1033,codepage:1200},{ProductName:'Checkfire',FileDescription:'Checkfire',CompanyName:'Mr. Morris',OriginalFilename:'Checkfire.exe',LegalCopyright:'Mr. Morris'});
  vi.setFileVersion(1,0,0,0);vi.setProductVersion(1,0,0,0);vi.outputToResourceEntries(res.entries);
  res.outputResource(pe);fs.writeFileSync(exe,Buffer.from(pe.generate()));
};
